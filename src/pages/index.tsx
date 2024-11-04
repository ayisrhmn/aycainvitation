import Head from 'next/head';
import { APP } from '@/constants';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/landing-page/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/landing-page/card';
import {
  Check,
  FacebookLogo,
  InstagramLogo,
  TwitterLogo
} from '@phosphor-icons/react';

const Home = () => {
  return (
    <div className='flex flex-col min-h-screen bg-white'>
      <Head>
        <title>{APP.title}</title>
      </Head>
      <header className='px-4 lg:px-6 h-14 flex items-center bg-pink-100'>
        <Link className='flex items-center justify-center' href='#'>
          <span className='sr-only'>Aycainvitation</span>
          <Image
            src='/favicon.ico'
            width={32}
            height={32}
            alt='Aycainvitation logo'
            className='h-8 w-8'
          />
          <span className='ml-2 text-lg font-semibold text-pink-800 hidden md:block'>
            Aycainvitation
          </span>
        </Link>
        <nav className='ml-auto flex gap-4 sm:gap-6'>
          <Link
            className='text-sm font-medium hover:underline underline-offset-4 text-pink-700'
            href='#themes'
          >
            Themes
          </Link>
          <Link
            className='text-sm font-medium hover:underline underline-offset-4 text-pink-700'
            href='#pricing'
          >
            Pricing
          </Link>
          <Link
            className='text-sm font-medium hover:underline underline-offset-4 text-pink-700'
            href='#'
          >
            Contact
          </Link>
        </nav>
      </header>
      <main className='flex-1'>
        <section className='w-full flex flex-col items-center py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-br from-pink-300 via-pink-200 to-white'>
          <div className='container px-4 md:px-6'>
            <div className='flex flex-col items-center space-y-4 text-center'>
              <div className='space-y-2'>
                <h1 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-pink-900'>
                  Elegant Wedding Invitations
                </h1>
                <p className='mx-auto max-w-[700px] text-pink-800 md:text-xl'>
                  Crafting beautiful, personalized invitations for your special
                  day. Let us help you set the tone for your perfect wedding.
                </p>
              </div>
              <div className='space-x-4'>
                <Button className='bg-pink-600 text-white hover:bg-pink-700'>
                  Get Started
                </Button>
                <Button
                  variant='outline'
                  className='border-pink-600 text-pink-700 hover:bg-pink-100'
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section
          id='themes'
          className='w-full flex flex-col items-center py-12 md:py-24 lg:py-32 bg-white'
        >
          <div className='container px-4 md:px-6'>
            <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8 text-center text-pink-800'>
              Our Invitation Themes
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto'>
              {[
                {
                  theme: 'Lime',
                  description: 'Earthy tones with a touch of vintage elegance',
                  image: ''
                },
                {
                  theme: 'Blossom',
                  description: 'Clean lines and simple sophistication',
                  image: ''
                }
              ].map((theme, i) => (
                <Card key={i} className='overflow-hidden border-pink-200'>
                  <Image
                    src={theme.image}
                    width={400}
                    height={300}
                    alt={`${theme.theme} Invitation`}
                    className='object-cover w-full h-48'
                  />
                  <CardHeader>
                    <CardTitle className='text-pink-700'>
                      {theme.theme}
                    </CardTitle>
                    <CardDescription className='text-pink-600'>
                      {theme.description}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button
                      variant='outline'
                      className='w-full border-pink-500 text-pink-500 hover:bg-pink-100'
                    >
                      View Samples
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
        <section
          id='pricing'
          className='w-full flex flex-col items-center py-12 md:py-24 lg:py-32 bg-pink-50'
        >
          <div className='container px-4 md:px-6'>
            <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8 text-center text-pink-800'>
              Our Pricing
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto'>
              {[
                {
                  title: 'Basic',
                  price: '$299',
                  description: 'Perfect for simple, elegant invitations',
                  features: [
                    'Digital design',
                    'Up to 2 revisions',
                    'Digital proof',
                    'Print-ready files',
                    'Basic customization',
                    'Email support'
                  ]
                },
                {
                  title: 'Premium',
                  price: '$499',
                  description: 'Ideal for custom, detailed invitations',
                  features: [
                    'Custom design',
                    'Unlimited revisions',
                    'Digital proof',
                    'Print-ready files',
                    'RSVP card design',
                    'Envelope addressing',
                    'Advanced customization',
                    'Priority email support',
                    'Phone consultation'
                  ]
                }
              ].map((plan) => (
                <Card
                  key={plan.title}
                  className='flex flex-col border-pink-200'
                >
                  <CardHeader>
                    <CardTitle className='text-pink-700'>
                      {plan.title}
                    </CardTitle>
                    <CardDescription className='text-pink-600'>
                      {plan.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className='flex-grow'>
                    <p className='text-4xl font-bold mb-4 text-pink-800'>
                      {plan.price}
                    </p>
                    <ul className='space-y-2'>
                      {plan.features.map((feature) => (
                        <li
                          key={feature}
                          className='flex items-center text-pink-600'
                        >
                          <Check className='text-pink-500 mr-2' />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className='w-full bg-pink-500 text-white hover:bg-pink-600'>
                      Choose Plan
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className='flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-pink-200 bg-pink-100'>
        <p className='text-xs text-pink-600'>
          © 2024 Aycainvitation. All rights reserved.
        </p>
        <nav className='sm:ml-auto flex gap-4 sm:gap-6'>
          <Link
            className='text-pink-600 hover:text-pink-800'
            href='#'
            aria-label='Facebook'
          >
            <FacebookLogo className='h-4 w-4' />
          </Link>
          <Link
            className='text-pink-600 hover:text-pink-800'
            href='#'
            aria-label='Instagram'
          >
            <InstagramLogo className='h-4 w-4' />
          </Link>
          <Link
            className='text-pink-600 hover:text-pink-800'
            href='#'
            aria-label='Twitter'
          >
            <TwitterLogo className='h-4 w-4' />
          </Link>
        </nav>
      </footer>
    </div>
  );
};

export default Home;
