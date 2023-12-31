import { InferGetStaticPropsType } from 'next';
import { WithUrqlProps, initUrqlClient } from 'next-urql';
import Head from 'next/head';

import { AppProvider } from '@components/contexts/appContext';
import { Header } from '@components/header';
import Hero from '@components/hero';
import { Layout } from '@components/layout';
import Projects from '@components/projects';
import Stacks from '@components/stacks';
import { addPublicationJsonLd } from '@starter-kit/utils/seo/addPublicationJsonLd';
import { getAutogeneratedPublicationOG } from '@starter-kit/utils/social/og';
import {
	HomePageInitialDocument,
	HomePageInitialQueryVariables,
	HomePagePostsDocument,
	HomePagePostsQueryVariables,
} from '../generated/graphql';
import { createHeaders, createSSRExchange, getUrqlClientConfig } from '../lib/api/client';

const REVALIDATION_INTERVAL_POST_VIEWS_ACTIVE = 60 * 60; // 1 hour
const REVALIDATION_INTERVAL = 60 * 60 * 24 * 30; // 1 month

export default function Index(
	props: InferGetStaticPropsType<typeof getStaticProps> & Required<WithUrqlProps>,
) {
	const { publication } = props;

	return (
		<AppProvider publication={publication}>
			<Layout>
				<Head>
					<title>
						{publication.displayTitle || publication.title || 'Hashnode Blog Starter Kit'}
					</title>
					<meta
						name="description"
						content={
							publication.descriptionSEO || publication.title || `${publication.author.name}'s Blog`
						}
					/>
					<meta property="twitter:card" content="summary_large_image" />
					<meta
						property="twitter:title"
						content={publication.displayTitle || publication.title || 'Hashnode Blog Starter Kit'}
					/>
					<meta
						property="twitter:description"
						content={
							publication.descriptionSEO || publication.title || `${publication.author.name}'s Blog`
						}
					/>
					<meta
						property="og:image"
						content={publication.ogMetaData.image || getAutogeneratedPublicationOG(publication)}
					/>
					<meta
						property="twitter:image"
						content={publication.ogMetaData.image || getAutogeneratedPublicationOG(publication)}
					/>
					<script
						type="application/ld+json"
						dangerouslySetInnerHTML={{
							__html: JSON.stringify(addPublicationJsonLd(publication)),
						}}
					/>
				</Head>
				<Header isHome={true} />
				<Hero />
				{/* My Stacks */}
				<Stacks />
				{/* Projects */}
				<Projects />

				{/* Footer */}
				{/* <Footer /> */}
			</Layout>
		</AppProvider>
	);
}

export const getStaticProps = async () => {
	const ssrCache = createSSRExchange();
	const urqlClient = initUrqlClient(getUrqlClientConfig(ssrCache), false);
	const host = process.env.NEXT_PUBLIC_HASHNODE_PUBLICATION_HOST;
	const homePageInitialQueryVariables: HomePageInitialQueryVariables = {
		host,
	};
	const publicationInfo = await urqlClient
		.query(HomePageInitialDocument, homePageInitialQueryVariables, {
			fetchOptions: {
				headers: createHeaders({ byPassCache: false }),
			},
			requestPolicy: 'network-only',
		})
		.toPromise();

	if (publicationInfo.error) {
		console.error('Error while fetching publication info', {
			variables: homePageInitialQueryVariables,
			error: publicationInfo.error,
		});
		throw publicationInfo.error;
	}
	if (!publicationInfo.data?.publication) {
		console.error('Publication not found fetching publication info; returning 404', {
			variables: homePageInitialQueryVariables,
		});
		return {
			notFound: true,
			revalidate: REVALIDATION_INTERVAL,
		};
	}

	const { publication } = publicationInfo.data;

	const subtractValue = publication.pinnedPost ? 1 : 0;
	const initialLimit =
		publication.preferences.layout === 'magazine' ? 12 - subtractValue : 6 - subtractValue;

	const homePagePostsVariables: HomePagePostsQueryVariables = {
		host,
		first: initialLimit,
		filter: { excludePinnedPost: !!publication.pinnedPost },
	};
	const homePagePostsResponse = await urqlClient
		.query(HomePagePostsDocument, homePagePostsVariables, {
			fetchOptions: {
				headers: createHeaders({ byPassCache: false }),
			},
			requestPolicy: 'network-only',
		})
		.toPromise();
	if (homePagePostsResponse.error) {
		console.error('Error while fetching home page posts', {
			error: homePagePostsResponse.error,
			variables: homePagePostsVariables,
		});
		throw homePagePostsResponse.error;
	}
	if (!homePagePostsResponse.data?.publication) {
		console.error('Publication not found fetching home page posts; returning 404', {
			variables: homePagePostsVariables,
		});
		return {
			notFound: true,
			revalidate: REVALIDATION_INTERVAL,
		};
	}

	return {
		props: {
			publication,
			initialLimit,
			urqlState: ssrCache.extractData(),
			host,
			isHome: true,
		},
		revalidate: 1,
	};
};
