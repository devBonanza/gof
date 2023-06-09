import * as React from 'react';

import {HorizontalGridsConfigurationContext, frameworkGrids} from './horizontalGridconfiguration';

const withHorizontalGridsConfiguration = <P extends object>(
    WrappedComponent: React.ComponentType<P>): React.FC<P> => {
    const HOC = (props: any): React.ReactElement => (
        <HorizontalGridsConfigurationContext.Consumer>
            {(auth: any): React.ReactElement => {
                return (
                    <WrappedComponent {...props}{...frameworkGrids}/>
                );
            }}
        </HorizontalGridsConfigurationContext.Consumer>
    );

    HOC.displayName = `withAuthentication(${WrappedComponent.displayName || WrappedComponent.name})`;
    HOC.WrappedComponent = WrappedComponent;
    return HOC;
};

export default withHorizontalGridsConfiguration;