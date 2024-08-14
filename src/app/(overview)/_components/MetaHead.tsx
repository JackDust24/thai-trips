import Head from 'next/head';

export function MetaHead() {
  return (
    <Head>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'http://schema.org',
            '@type': 'WebSite',
            url: 'https://thai-trips.vercel.app/',
            name: 'Thai Hiking Trips',
            author: {
              '@type': 'Person',
              name: 'Jason Whittaker',
            },
            description:
              'Thai hiking app for booking trips around Thailand - demo',
          }),
        }}
      />

      <title>Thai Trips App </title>
      <meta
        name='description'
        content='Thai hiking app for booking trips around Thailand - demo'
      />
      <meta
        name='keywords'
        content='hiking, trips, popular destinations, new trips'
      />
      <meta name='author' content='Jason Whittaker' />
      <meta property='og:title' content='Home - Thai Hiking Trips' />
      <meta
        property='og:description'
        content='DEMO - Explore the most popular and newest trips on our platform.'
      />
      <link rel='canonical' href='https://thai-trips.vercel.app/' />
    </Head>
  );
}
