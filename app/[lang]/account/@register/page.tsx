import { GoogleButton } from "@/components/account/google-button";
import { Link } from "@/components/i18n/link";
import SignUpForm from "@/components/sign-up-form";

export default function AccountRegisterPage() {
  return (
    <>
      <h3 className='mt-6 text-lg font-semibold text-foreground dark:text-foreground'>
        Enter your details below to register an account
      </h3>
      <p className='mt-2 text-sm text-muted-foreground dark:text-muted-foreground'>
        Already have an account?{" "}
        <Link
          href='/sign-in'
          className='font-medium text-primary hover:text-primary/90 dark:text-primary hover:dark:text-primary/90'
        >
          Sign In
        </Link>
      </p>
      <div className='mt-8'>
        <GoogleButton/>
      </div>

      <div className='py-7'>
        <div className='relative'>
          <div className='absolute inset-0 flex items-center'>
            <span className='w-full border-t'></span>
          </div>
          <div className='relative flex justify-center text-xs uppercase'>
                        <span className='bg-background px-2 text-muted-foreground'>
                           Or continue with
                        </span>
          </div>
        </div>
      </div>
      <SignUpForm/>

      <p className='pt-3 text-sm text-muted-foreground'>
        By continue, you agree to our{" "}
        <Link
          href='#'
          className='underline underline-offset-4 hover:text-primary'
        >
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link
          href='#'
          className='underline underline-offset-4 hover:text-primary'
        >
          Privacy Policy
        </Link>
        .
      </p>
    </>

  );
}
