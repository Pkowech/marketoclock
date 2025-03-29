import Link from 'next/link';

export default function NotFound() {
 return (
 <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
 <div className="text-center">
 <h1 className="text-4xl font-bold text-gray-900">404 - Page Not Found</h1>
 <p className="mt-4 text-lg text-gray-600">
 Sorry, the page you’re looking for doesn’t exist.
 </p>
 <p className="mt-4">
 <Link href="/" className="text-indigo-600 hover:text-indigo-500 font-medium">
 Go back to the homepage
 </Link>
 </p>
 </div>
 </div>
 );
}