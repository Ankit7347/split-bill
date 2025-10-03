export default function StudentFooter() {
  return (
    <footer className="w-full bg-gray-900 text-white py-3 px-6 mt-8 text-center">
      <span>&copy; {new Date().getFullYear()} Student Dashboard. All rights reserved.</span>
    </footer>
  );
}
