import React, { useEffect, useState } from 'react';

type FileProps = {
    files: [] | null;
}

const SecondaryImages: React.FC<FileProps> = ({ files }) => {
    const [previews, setPreviews] = useState<(string | ArrayBuffer)[]>([]);
    useEffect(() => {
        if (files) {
            const readerPromises: Promise<string | ArrayBuffer>[] = [];
            files.forEach((file) => {
                console.log(file)
                const reader = new FileReader();
                reader.readAsDataURL(file);
                readerPromises.push(new Promise<string | ArrayBuffer>((resolve, reject) => {
                    reader.onload = () => {
                        resolve(reader.result as string | ArrayBuffer);
                    };
                    reader.onerror = reject;
                }));
            });
            
            Promise.all(readerPromises)
                .then((results) => {
                    setPreviews(results);
                })
                .catch((error) => {
                    console.error("Error reading files:", error);
                });
        } else {
            setPreviews([]);
        }
    }, [files]);
    
    return (
        <div>
          
            {previews.map((preview, index) => (
                    <img className='w-[300px] h-20' src={preview as string} key={index}/>
         
            ))}
        </div>
    );
}

export default SecondaryImages;
