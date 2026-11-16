import { PageHero } from '../components/PageHero';

export function NotFound() {
  return (
    <PageHero
      crumbs={[{ label: 'Page not found' }]}
      title="This page *does not exist*"
      lede="The link may be old, or the address may have a typo. The pages below are the usual places to start."
      actions={
        <>
          <a className="btn btn-primary" href="/">
            Go to the home page
          </a>
          <a className="btn btn-outline" href="/products">
            See the products
          </a>
        </>
      }
    />
  );
}
