import * as React from 'react';
import { observer } from 'mobx-react';
import { IconObject, Input, Label, Loader } from 'Component';
import { blockStore, detailStore, menuStore } from 'Store';
import { C, I, ObjectUtil, DataUtil } from 'Lib';
import Constant from 'json/constant.json';

interface State {
	loading: boolean;
};

const PopupSettingsUserInfo = observer(class PopupSettingsUserInfo extends React.Component<I.Popup, State> {

	ref: any = null;
	state: State = {
		loading: false,
	};

    constructor (props: I.Popup) {
        super(props);

        this.onMenu = this.onMenu.bind(this);
        this.onUpload = this.onUpload.bind(this);
        this.onName = this.onName.bind(this);
    };

    render () {
		const object = this.getObject();
		const { loading } = this.state;

        return (
            <div className="userInfo">
				<div className="iconWrapper">
					{loading ? <Loader /> : ''}
					<IconObject 
						id="userpic" 
						object={object} 
						size={80} 
						onClick={this.onMenu} 
					/>
				</div>

                <div className="name">
                    <Label className="sectionName" text="Name" />
                    <Input 
						ref={ref => this.ref = ref} 
						value={object.name} 
						onKeyUp={this.onName} 
						placeholder={DataUtil.defaultName('page')} 
					/>
                </div>
            </div>
        );
    };

    onMenu () {
		const { getId } = this.props;
        const object = this.getObject();

        if (!object.iconImage) {
            this.onUpload(object.id);
            return;
        };

        const options = [
            { id: 'upload', name: 'Change' },
            { id: 'remove', name: 'Remove' }
        ];

        menuStore.open('select', {
            element: `#${getId()} #userpic`,
            horizontal: I.MenuDirection.Center,
            data: {
                value: '',
                options,
                onSelect: (e: any, item: any) => {
					switch (item.id) {
						case 'upload': {
							this.onUpload(object.id);
							break;
						};

						case 'remove': {
							ObjectUtil.setIcon(object.id, '', '');
							break;
						};
					};
                },
            }
        });
    };

    onUpload (rootId) {
        const options = {
            properties: [ 'openFile' ],
            filters: [ { name: '', extensions: Constant.extension.image } ]
        };

        window.Electron.showOpenDialog(options).then((result) => {
            const files = result.filePaths;
            if ((files == undefined) || !files.length) {
                return;
            };

            this.setState({ loading: true });

            C.FileUpload('', files[0], I.FileType.Image, (message: any) => {
                if (message.error.code) {
                    return;
                };

                ObjectUtil.setIcon(rootId, '', message.hash, () => {
                    this.setState({ loading: false });
                });
            });
        });
    };

    onName (e: any) {
        const object = this.getObject();
        ObjectUtil.setName(object.id, this.ref.getValue());
    };

	getObject () {
		return detailStore.get(Constant.subId.profile, blockStore.profile);
	};

});

export default PopupSettingsUserInfo;