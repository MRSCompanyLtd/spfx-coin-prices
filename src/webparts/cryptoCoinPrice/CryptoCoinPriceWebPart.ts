import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'CryptoCoinPriceWebPartStrings';
import CryptoCoinPrice from './components/CryptoCoinPrice';
import { ICryptoCoinPriceProps } from './components/ICryptoCoinPriceProps';

export interface ICryptoCoinPriceWebPartProps {
  coin: string;
}

export default class CryptoCoinPriceWebPart extends BaseClientSideWebPart<ICryptoCoinPriceWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ICryptoCoinPriceProps> = React.createElement(
      CryptoCoinPrice,
      {
        coin: this.properties.coin
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('coin', {
                  label: strings.CoinFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
