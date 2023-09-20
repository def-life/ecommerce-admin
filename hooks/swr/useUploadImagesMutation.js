import axios from 'axios'
import useSWRMutation from 'swr/mutation'

async function uploadImages(url, { arg }) {
    return (await axios.post(url, arg, {
        headers: {
            "Content-Type": "multipart/form-data"
          }
    })).data;
}

export default function useUploadImagesMutation() {
    const options = {
    }

    const { data, error, trigger, isMutating, reset } = useSWRMutation("/api/upload", uploadImages, options);
    return { data, error, trigger, isMutating, reset }

}

