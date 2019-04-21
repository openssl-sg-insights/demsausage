import * as React from "react"
import { connect } from "react-redux"
import { IGeoJSON } from "../../redux/modules/interfaces"
import { IStore } from "../../redux/modules/reducer"
import MapExtentChooser from "./MapExtentChooser"

export interface IProps {
    value: IGeoJSON | undefined
    onChange: (geojson: IGeoJSON) => void
}

export interface IDispatchProps {}

export interface IStoreProps {}

export interface IStateProps {}

type TComponentProps = IProps & IStoreProps & IDispatchProps
class MapExtentChooserContainer extends React.Component<TComponentProps, IStateProps> {
    render() {
        const { value, onChange } = this.props

        return <MapExtentChooser value={value} onChange={onChange} />
    }
}

const mapStateToProps = (state: IStore, ownProps: TComponentProps): IStoreProps => {
    return {}
}

const mapDispatchToProps = (dispatch: Function): IDispatchProps => {
    return {}
}

const MapExtentChooserContainerWrapped = connect<IStoreProps, IDispatchProps, IProps, IStore>(
    mapStateToProps,
    mapDispatchToProps
)(MapExtentChooserContainer)

export default MapExtentChooserContainerWrapped
