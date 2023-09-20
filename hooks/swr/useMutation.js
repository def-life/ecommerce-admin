import axios from 'axios'
import useSWRMutation from 'swr/mutation'

export default function useMutation(endpoint, mutationType, options = {}) {

    if (!["POST", "PUT", "DELETE"].includes(mutationType)) {
        throw new Error("unknown mutation type ")
    }
    mutationType = mutationType.toLowerCase();

    const { data, error, trigger, isMutating, reset } = useSWRMutation(endpoint, async (url, { arg }) => {
        return (await axios[mutationType](url, arg)).data;
    }, options);
    return { data, error, trigger, isMutating, reset }

}

