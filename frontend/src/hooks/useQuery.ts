import { useEffect, useState } from "react";

function assembleUrl(strings: string[], params: (string | number)[]) {
  return (
    "/api" +
    strings
      .reduce<string[]>(
        (acc, string, i) => [
          ...acc,
          string,
          encodeURI((params[i] ?? "").toString()),
        ],
        []
      )
      .join("")
  );
}

export function useQuery(strings: string[], ...params: (string | number)[]) {
  const url = assembleUrl(strings, params);

  const [state, setState] = useState<[boolean, string | null, boolean | null]>([
    true,
    null,
    null,
  ]);

  useEffect(() => {
    // setIsLoading(() => true);
    fetch(url)
      .then((response) => {
        if (response.status === 200) return response.json();
        // else if (response.status === 401) redirect("/login"); // FIXME
        else setState([false, "Non 200 status code", null]);
      })
      .then((data) => {
        if (data.success) setState(() => [false, null, data.data]);
        else setState([false, data.error, null]);
      });
  }, [url]);

  return state;
}

export function useUpdate(strings: string[], ...params: (string | number)[]) {
  const url = assembleUrl(strings, params);

  return async (data: object, method: "GET" | "POST" | "DELETE") =>
    (
      await fetch(url, {
        method: method ?? "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      })
    ).json();
}
