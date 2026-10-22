import { Navigate, useSearchParams } from 'react-router-dom';

export default function VerifyCertificate() {
  const [params] = useSearchParams();
  const number = params.get('certificate');
  return <Navigate replace to={`/careers${number ? `?certificate=${encodeURIComponent(number)}` : ''}#verify-certificate`} />;
}
