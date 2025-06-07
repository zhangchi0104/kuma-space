import { useQuery } from "@tanstack/react-query";

const searchTags = (search: string) => {
  return useQuery({
    queryKey: ["tags", search],
    queryFn: () => {
      return fetch(`/api/tags?search=${search}`).then((res) => res.json());
    },
  });
};
