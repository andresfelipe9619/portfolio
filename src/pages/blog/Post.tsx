import { getPost, markdownToHTML } from "@/data/blog";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Post() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<any>(null);

  useEffect(() => {
    if (slug) {
      getPost(slug).then((post) => {
        setPost(post);
      });
    }
  }, [slug]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <section>
      <h1 className="font-medium text-2xl mb-8 tracking-tighter">
        {post.metadata.title}
      </h1>
      <div dangerouslySetInnerHTML={{ __html: post.source }} />
    </section>
  );
}
