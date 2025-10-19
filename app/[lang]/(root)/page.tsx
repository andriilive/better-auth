import ImageUploads from "@/components/ImageUploads";
import { UploadsEmpty } from "@/components/uploads/uploads-empty";
import type { I18nLocale } from "@/lib/i18n";

export default async function PageHome({
  params,
}: {
  params: Promise<{ lang: I18nLocale }>,
  searchParams: Promise<{ [key: string]: string | string[] }> | undefined,
}) {
  const { lang } = await params;
  return (
    <main className=''>
      <div className='mx-auto px-4 pt-8'>
        <UploadsEmpty locale={lang}/>
        <ImageUploads/>
      </div>
    </main>
  );
}
