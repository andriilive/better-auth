import { Logo } from "@/components/Logo";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AccountLayout({
  login,
  register,
}: {
  children: React.ReactNode;
  login: React.ReactNode;
  register: React.ReactNode;
}) {
  return (
    <>
      <div className='flex items-center justify-center min-h-screen'>
        <div className='flex flex-1 flex-col justify-center px-4 py-10 lg:px-6'>
          <div className='sm:mx-auto sm:w-full sm:max-w-md'>
            <div className='flex items-center'>
              <Logo/>
              <Tabs defaultValue='register' className='w-[400px]'>
                <TabsList>
                  <TabsTrigger value='register'>register</TabsTrigger>
                  <TabsTrigger value='login'>login</TabsTrigger>
                </TabsList>
                <TabsContent value='register'>
                  {register}
                </TabsContent>
                <TabsContent value='login'>
                  {login}
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
