import { useEffect } from "react";

interface SEO {
  title: string;
  description: string;
}

const useSEO = ({ title, description }: SEO) => {
  useEffect(() => {
    document.title = title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", description);
  }, [title, description]);
};

export default useSEO;
