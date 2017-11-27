import * as summaryTypes from './summary/types'
import * as detailsTypes from './details/types'
import * as sharedTypes from './shared/types'

export type BaseAppState = {
    employees: sharedTypes.Eventual<sharedTypes.Guy[]>
}