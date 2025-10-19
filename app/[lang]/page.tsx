import { ImageUploads } from "@/components/image-uploads";
import { UploadsEmpty } from "@/components/uploads/uploads-empty";
import { parseLangParams } from "@/lib/i18n";

export default async function Page({ params }: PageProps<"/[lang]">) {
  const { lang, t } = parseLangParams(await params);
  return (
    <main className=''>
      <div className='mx-auto px-4 pt-8'>
        <UploadsEmpty locale={lang}/>
        <ImageUploads/>
      </div>
    </main>
  );
}
