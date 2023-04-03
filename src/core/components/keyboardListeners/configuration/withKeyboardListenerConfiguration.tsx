import * as React from 'react';
import {keyboardListenerConfigurationContext, frameworkKeyboardListener} from './keyboardListenerConfiguration';

const withKeyboardListenerConfiguration = <P extends object>(
    WrappedComponent: React.ComponentType<P>): React.FC<P> => {
    const HOC = (props: any): React.ReactElement => (
        <keyboardListenerConfigurationContext.Consumer>
            {(auth: any): React.ReactElement => {
                return (
                    <WrappedComponent {...props}{...frameworkKeyboardListener}/>
                );
            }}
        </keyboardListenerConfigurationContext.Consumer>
    );

    HOC.displayName = `withAuthentication(${WrappedComponent.displayName || WrappedComponent.name})`;
    HOC.WrappedComponent = WrappedComponent;
    return HOC;
};

export default withKeyboardListenerConfiguration;