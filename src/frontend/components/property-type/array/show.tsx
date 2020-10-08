import React, { ReactNode } from 'react'
import { Section, ValueGroup } from '@admin-bro/design-system'

import { RecordJSON, PropertyJSON } from '../../../interfaces'
import { flat } from '../../../../utils'

type Props = {
  property: PropertyJSON;
  record: RecordJSON;
  ItemComponent: typeof React.Component;
}

export default class Show extends React.PureComponent<Props> {
  render(): ReactNode {
    const { property, record, ItemComponent } = this.props

    const items = flat.get(record.params, property.path) || []

    return (
      <ValueGroup label={property.label}>
        <Section>
          {items.map((item, i) => (
            <ItemComponent
              {...this.props}
              // eslint-disable-next-line react/no-array-index-key
              key={i}
              property={{
                ...property,
                path: `${property.path}.${i}`,
                label: `[${i + 1}]`,
                isArray: false,
              }}
            />
          ))}
        </Section>
      </ValueGroup>
    )
  }
}
