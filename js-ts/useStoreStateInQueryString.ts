import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

export default function useStateInQueryString(pathName: string, key: string, defaultValue: string): [string, Dispatch<SetStateAction<string>>] {
  const router = useRouter();
  const [value, setValue] = useState(defaultValue);
  const currentQsValue = router.query[key];
  const isFirstRenderRef = useRef(true)

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    /**
     * If the router is ready, then we may have state in the qs.
     * We try to assign it and then resume normal updating of
     * query string based on state.
     */
    if (isFirstRenderRef.current) {
      const initialState = router.query[key];
      if (initialState) {
        setValue(initialState as string)
      }
      isFirstRenderRef.current = false;
      return
    }

    if (currentQsValue !== value) {
      let url = {
        pathname: pathName,
        query: {
          ...router.query,
          [key]: value
        }
      }
  
      router.push(url, undefined, {
        // Since we only use these options to store state, we don't want to rerun the component lifecycle or scroll.
        shallow: true,
        scroll: false,
      });
    };
  }, [pathName, key, router, value, currentQsValue])


  return [value, setValue];
}


