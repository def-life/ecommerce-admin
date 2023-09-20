import { useEffect } from "react";

let liveQueries = new Set();

export function trackLiveQueries(useSWRNext) {
    return (key, fetcher, config) => {
        const swr = useSWRNext(key, fetcher, config)
        useEffect(() => {
            liveQueries.add(key)

            return () => {
                liveQueries.delete(key)
            }
        }, [key])
        return swr
      }
}