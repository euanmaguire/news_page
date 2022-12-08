import {gql} from "graphql-request"
import sortNewsByImage from "./sortNewsByImage";

const fetchNews = async (
    category?: Category | string,
    keywords?: string,
    isDynamic?: boolean
) => {
    //GraphQL query
    const query = gql`
    query MyQuery(
        $access_key: String!
        $keywords: String
        $category: String!
    ) {
        myQuery(
            access_key: $access_key
            keywords: $keywords
            category: $category
            countries: "gb, us, fr"
            sort: "published_desc"
        ) {
            data {
            author
            category
            country
            description
            image
            language
            published_at
            source
            title
            url
            }
            pagination {
            count
            limit
            offset
            total
            }
        }
    }
    `;

    //Fetch function 
    const res = await fetch("https://wardenburg.stepzen.net/api/worn-squirrel/__graphql", {
        method: "POST",
        cache: isDynamic ? "no-cache" : "default",
        next: isDynamic ? {revalidate: 0} : {revalidate: 20},
        headers: {
                    "Content-Type": "application/json",
                    Authorization: `Apikey ${process.env.STEPZEN_API_KEY}`,
        },
        body: JSON.stringify({
            query,
            variables: {
                access_key: process.env.MEDIASTACK_ACCESS_KEY,
                categories: category,
                keywords: keywords,
            },
        }),
    });

    console.log(
        "LOADING NEW DATA FROM API for category >>>",
        category,
        keywords
    )

    const newsResponse =await res.json();

    //Sort functionby images vs no images
    const news = sortNewsByImage(newsResponse.data.myQuery);

    //Return data
    return news;
};

export default fetchNews;

//stepzen import curl http://api.mediastack.com/v1/news?access_key=9c510b3db2abd74f2b643d194e51121c&sources=business,sports