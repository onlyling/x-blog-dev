import React from 'react';

const Node: React.FunctionComponent<LoadableExport.LoadingComponentProps> = ({ isLoading, error }) => {
    // Handle the loading state
    if (isLoading) {
        return <div className="app-page-loading">Loading...</div>;
    } else if (error) {
        // Handle the error state
        return <div className="app-page-loading">Sorry, there was a problem loading the page.</div>;
    } else {
        return null;
    }
};

export default Node;
