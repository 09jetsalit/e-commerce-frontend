import { useState } from "react";
import { toast } from "react-toastify";
import Resizer from "react-image-file-resizer";
import useEcomStore from "../../store/e-com-store";
import { uploadFiles } from "../../api/Product";


const UploadFile = ({ form, setForm }: any) => {
    // console.log(form);
    
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const token = useEcomStore<any>((state) => state.token)

    const handleOnChange = (e: any) => {
        const files = e.target.files
        // console.log(files);
        
        if(files){
            setIsLoading(true)
            let allFiles = form.images //empty array []
            for (let i = 0; i<files.length; i++) {
                // console.log(files[i]);
                 
                const file = files[i];
                if(!file.type.startsWith('image')){
                    toast.error(`File ${file.name} is not picture`)
                    continue 
                }
                // image resize
                Resizer.imageFileResizer(
                    files[i],
                    720,
                    720,
                    "JPEG",
                    100,
                    0,
                    (data) => {
                        // console.log(data);
                        
                        // endpoint Backend
                        uploadFiles(token, data)
                            .then((res: any) => {
                                console.log(res)
                                allFiles.push(res.data)
                                setForm({
                                    ...form,
                                    images: allFiles
                                })
                                setIsLoading(false)
                                toast.success('Upload image Sucess!!!')
                            })
                            .catch((err: any) => {
                                console.log(err)
                                setIsLoading(false)
                            })
                    },
                    "base64"
                )
            }
        }
        
    }
  return (
    <div>
        <input type="file" name='images'
        multiple onChange={handleOnChange}/>
    </div>
  )
}

export default UploadFile