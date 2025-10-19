import { EmptyUploads } from "@/components/uploads/EmptyUploads";

export default async function PageHome() {
  return (
    <main className=''>
      <div className='mx-auto px-4 pt-8'>
        <EmptyUploads/>
      </div>
    </main>
  );
}
