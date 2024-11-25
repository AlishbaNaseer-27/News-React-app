

import React, { useEffect, useState } from 'react';
import NewsItem from './Newsitem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

const News = ({
    country = 'us',
    pageSize = 8,
    category = 'general',
    apiKey,
    setProgress,
}) => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const updateNews = async () => {
        try {
            setProgress(10);
            const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`;
            setLoading(true);
            let data = await fetch(url);
            setProgress(30);
            let parsedData = await data.json();
            setProgress(70);

            if (parsedData.articles) {
                setArticles(parsedData.articles);
                setTotalResults(parsedData.totalResults);
            } else {
                setArticles([]);
                setTotalResults(0);
            }

            setLoading(false);
            setProgress(100);
        } catch (error) {
            console.error("Failed to fetch news articles:", error);
            setArticles([]);
            setLoading(false);
        }
    };

    const fetchMoreData = async () => {
        try {
            const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${page + 1}&pageSize=${pageSize}`;
            setPage(page + 1);
            let data = await fetch(url);
            let parsedData = await data.json();

            if (parsedData.articles) {
                setArticles(articles.concat(parsedData.articles));
                setTotalResults(parsedData.totalResults);
            }
        } catch (error) {
            console.error("Failed to fetch more news articles:", error);
        }
    };

    useEffect(() => {
        document.title = `${capitalizeFirstLetter(category)} - NewsMonkey`;
        updateNews();
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <h1 className="text-center" style={{ margin: '35px 0px', marginTop: '90px' }}>
                NewsMonkey - Top {capitalizeFirstLetter(category)} Headlines
            </h1>
            {loading && <Spinner />}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}
            >
                <div className="container">
                    <div className="row">
                        {articles.map((element) => {
                            return (
                                <div className="col-md-4" key={element.url}>
                                    <NewsItem
                                        title={element.title ? element.title : ''}
                                        description={element.description ? element.description : ''}
                                        imageUrl={element.urlToImage}
                                        newsUrl={element.url}
                                        author={element.author}
                                        date={element.publishedAt}
                                        source={element.source.name}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </InfiniteScroll>
        </>
    );
};

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
    apiKey: PropTypes.string.isRequired,
    setProgress: PropTypes.func.isRequired,
};

export default News;
