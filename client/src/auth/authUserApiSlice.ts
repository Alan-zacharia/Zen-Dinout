import {apiSlice} from "../app/api/apiSlice";



export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
      login: builder.mutation({
        query: (credentials: { username: string; password: string; }) => ({
          arg: credentials,
          api: apiSlice,
          extraOptions: {}
        })
      })
    })
  })


export  const {useLoginMutation} = authApiSlice

