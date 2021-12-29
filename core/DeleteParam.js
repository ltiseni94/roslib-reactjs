import React, {Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import { deleteParam } from '../lib/param';
import { useRos } from '../lib/ros';

const defaultProps = {
    param: null,
    toggler: false,
}

const DeleteParam = (props = defaultProps) => {
    
    const ROS = useRos();

    useEffect(() => {
        if (props.toggler && props.param && (typeof props.param.name === "string") && (props.param.name !== '')) {
            deleteParam(ROS, props.param.name, () => {
                console.log(`Parameter "${props.param.name}" deleted`)
            })
        }
    }, [props.toggler, props.param])
    
    return (
        <Fragment />
    )
}

DeleteParam.propTypes = {
    param: PropTypes.object.isRequired,
    toggler: PropTypes.bool,
}

export default DeleteParam
