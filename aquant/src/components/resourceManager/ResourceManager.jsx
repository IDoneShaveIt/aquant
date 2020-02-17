import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {ResourceStatuses} from '../../services/useResource.jsx';
import './resourceManager.css';


function ErrorComponent({error}) {
    return <div className="error-component">{`an error as occurred - ${error}`}</div>;
}

ErrorComponent.propTypes = {
    error: PropTypes.object.isRequired,
};


function LoadingComponent() {
    return <div className="loading-component">Loading...</div>;
}


export default function ResourceManager({children, resource}) {
    if (_.isNull(resource)) {
        return null;
    }

    switch(resource.status) {
        case ResourceStatuses.LOADING:
            return <LoadingComponent/>;
        case ResourceStatuses.FAILURE:
            return <ErrorComponent error={resource.error}/>;
        case ResourceStatuses.SUCCESS:
            return _.isFunction(children) ? children(resource.result) : children;
        default:
            return null;

    }
}

ResourceManager.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.node
    ]).isRequired,
    resource: PropTypes.shape({
        result: PropTypes.object,
        error: PropTypes.object,
        status: PropTypes.string,
        execute: PropTypes.func,
        getResult: PropTypes.func,
    }),
};