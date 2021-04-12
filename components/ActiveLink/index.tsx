import { useRouter } from 'next/router'
// Code source: https://nextjs.org/docs/api-reference/next/router
export default function ActiveLink({ children, href }) {
  const router = useRouter();
  const handleClick = (e: any) => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <a href={href} onClick={handleClick}>
      {children}
    </a>
  );
}
