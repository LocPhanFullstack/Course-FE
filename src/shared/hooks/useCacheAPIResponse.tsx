import React from "react";

export function useCacheAPIResponse<T>(reactQueryHookResult: T): T {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    if ((reactQueryHookResult as any).data) {
      setData((reactQueryHookResult as any).data);
    }
  }, [(reactQueryHookResult as any).data]);

  return { ...reactQueryHookResult, data };
}
