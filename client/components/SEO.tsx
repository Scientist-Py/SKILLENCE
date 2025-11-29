import React from "react";
import { Helmet } from "react-helmet-async";

interface SEOProps {
    title?: string;
    description?: string;
    keywords?: string;
    image?: string;
    url?: string;
    schema?: string;
}

const SEO: React.FC<SEOProps> = ({
    title = "Skillence - AI & Coding Courses",
    description = "Master AI, Python, and Automation with Skillence. Join our 4-month mastery journey to build professional-grade projects.",
    keywords = "ai courses, computer courses, coding classes, python programming, automation, data analytics",
    image = "/og-image.jpg",
    url = "https://skillence.com",
    schema,
}) => {
    return (
        <Helmet>
            {/* Standard Metadata */}
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <link rel="canonical" href={url} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={url} />
            <meta property="twitter:title" content={title} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image" content={image} />

            {/* Structured Data (JSON-LD) */}
            {schema && <script type="application/ld+json">{schema}</script>}
        </Helmet>
    );
};

export default SEO;
