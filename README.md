# The roslib-reactjs package

A collection of context providers for creating GUI with ReactJS and React Native

Available components:

1) RosConnect
2) Subscriber
3) Publisher
4) ServiceCaller
5) ImageDisplay
6) ServiceServer
7) GetParam
8) SetParam
9) DeleteParam
10) TopicList
11) ServiceList
12) ParamList

Available hooks:

1) useMsg
2) useParam
3) useTopicList
4) useServiceList
5) useParamList

## Components

### 1- RosConnect

*Wrapper that makes websocket topic, services and parameters data available to your components. It requires rosbridge_server up - `roslaunch rosbridge_server rosbridge_websocket.launch`*

**Props:**

- url - *string* - websocket url string.
- autoconnect - *bool* - specify if you want to recover connection automatically. Retry interval specified by timeout prop
- timeout -  *number* - specify time interval to retry connecting in ms.

**Example:**

    <RosConnect
        url="ws://localhost:9090"
        autoconnect
        timeout={1000}
    >
        <ChildrenThatNeedWebsocket...>
    </RosConnect>

### 2- Subscriber

*Wrapper that makes topic messages available in children components using the useMsg() hook. Must be used within a RosConnect.*

**Props:**

- name - *string* - topic name - REQUIRED. Example: "/myTopicName"
- type - *string* - message type - REQUIRED. Example: "std_msgs/Int32"
- rate -  *number* - rate at which to throttle the topic - REQUIRED.
- queue_size - *number* - queue_size for message at bridge side - default = 10.

**Example:**

    <Subscriber
        name="/myTopicName"
        type="std_msgs/Int32"
        rate={10.0}
        queue_size={10}
    >
        <ChildrenWithUseMsgHook...>
    </Subscriber>

Inside the child component `<ChildrenWithUseMsgHook>` you just need to use:

    const message = useMsg();

React will trigger a re-render of the child component every time that a new message is received. The message object has the same fields as declared in the ROS .msg file for that kind of message.

### 3- Publisher

*A component that can publish a message to a topic on demand or at a given rate. Must be used within a RosConnect.*

**Props:**

- name - *string* - topic name - REQUIRED. Example: "/myTopicName"
- type - *string* - message type - REQUIRED. Example: "std_msgs/Int32"
- autoRepeat - *bool* - if True, publish message at rate specified by prop "rate". Else, (default) it will publish a message only when the prop "message" change.
- rate -  *number* - rate for publishing if autoRepeat is true - REQUIRED.
- queue_size - *number* - queue_size for message at bridge side - default = 10.
- message - *object* - the message to publish.

**Example:**

    <Publisher
        name"/myTopicName"
        type="std_msgs/Int32"
        autoRepeat
        rate={10.0}
        queue_size={1}
        message={{data: someFunc()}}
    />

### 4- ServiceCaller

*A service proxy that can be triggered by the "toggler" prop. Must be used within a RosConnect.*

**Props:**

- name - *string* - service name - REQUIRED. Example: "/sayHelloToWebsocket"
- type - *string* - service type - REQUIRED. Example: "/custom_msgs/myService"
- request - *object* - the request object as specified in the .srv file definition.
- toggler -  *bool* - each time toggler changes and its value is "true", the service will be called.
- callback - *func* - an optional callback that will be executed if a response is returned. Takes the response object, with field "values" as the first argument.
- failedCallback - *func* - an optional callback that will be executed if no response is received. It takes an input, usually a message from the server.

**Example:**

    <ServiceCaller
        name="/myService"
        type="custom_msgs/customService"
        request={{command: "say hi!"}}
        callback={(response) => {console.log(response.values)}}
        failedCallback={(msg) => {console.log(msg)}}
        toggler={statefulBoolean}}
    />

### 5- ImageDisplay

*Component that displays an image from the web_video_server node into the browser. It uses the `<img>` tag. Does not require being a child Component of a RosConnect because it does not rely on the websocket connection*

**Props:**

- host - *string* - web_video_server host - REQUIRED. Example: "http://localhost"
- port - *number* - web_video_server port - REQUIRED. Example: 8080
- topic - *string* - base topic name for your camera image. Example "/mycamera"
- defaultTransport - *string* - ROS image transport plugin, default to "raw", also "compressed" and "theora" may be available depending on the web_video_server.
- transport - *string* - Compression algorithm, default to "mjpeg", available also "ros_compressed". Check web_video_server documentation for other available compression algorithms.
- height - *number* - Image height pixel number.
- width - *number* - Image width pixel number.
- quality - *number* - Ranging from 0 to 100, used only if transport layer ("transport" prop) is "mjpeg"

**Example:**

    <ImageDisplay
        host="http://localhost"
        port={8080}
        topic="/myCamera"
        transport="ros_compressed"
        defaultTransport="compressed"
        height={480}
        width={640}
    />

Check the source code in the "core" folder of the Github repo for other Component props and usage.
