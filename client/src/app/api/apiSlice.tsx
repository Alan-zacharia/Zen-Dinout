import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut } from "../../auth/authUserSlice";
interface QueryArg {
  arg: any;
  api: any;
  extraOptions: any;
}

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3000",
  credentials: "include",
  prepareHeaders: (headers, { getState }: { getState: () => any }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async ({ arg, api, extraOptions }: QueryArg) => {
  let result = await baseQuery(arg, api, extraOptions);

  if (result?.error?.status === 403) {
    console.log("Sending refresh token");
    // send new refresh token to get the new access token
    const refreshResult = await baseQuery(
      "/api/refresh-token",
      api,
      extraOptions
    );
    console.log(refreshResult);
    if (refreshResult?.data) {
      const user = api.getState().auth.user;
      // store the new token
      api.dispatch(setCredentials({ ...refreshResult.data, user }));
      // retry the original query with new access token
      result = await baseQuery(arg, api, extraOptions);
    } else {
      api.dispatch(logOut(null));
    }
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});
