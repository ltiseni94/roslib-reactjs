import React, {createContext, useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types'
import { useRos } from '../lib/ros';
import { topicSettings, subscribe, unsubscribe } from '../lib/topic';

const MsgContext = createContext({});

export const Subscriber = (props) => {

    const ROS = useRos();
    const [message, setMessage] = useState(null);

    const queue_size = props.queue_size || 10

    useEffect(() => {
        const topic = subscribe(
            topicSettings(ROS, props.name, props.type, props.rate, queue_size),
            (msg) => {setMessage(msg)}
        );
        return () => {
            unsubscribe(topic);
        }
    }, [])

    return (
        <MsgContext.Provider value={message}>
            {props.children}
        </MsgContext.Provider>
    );
};

Subscriber.propTypes = {
    children: PropTypes.node.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    rate: PropTypes.number.isRequired,
    queue_size: PropTypes.number
};

export const useMsg = () => {
    const context = useContext(MsgContext);
    if (context === undefined) {
        throw new Error('useMsg must be used within a MsgProvider');
    }
    return context;
};
