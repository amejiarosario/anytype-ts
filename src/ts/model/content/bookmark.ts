import { I, Util } from 'Lib';
import { observable, intercept, makeObservable } from 'mobx';

class BlockContentBookmark implements I.ContentBookmark {
	
	targetObjectId: string = '';
	state: I.BookmarkState = I.BookmarkState.Empty;
	url: string = '';
	
	constructor (props: I.ContentBookmark) {
		this.targetObjectId = String(props.targetObjectId || '');
		this.state = Number(props.state) || I.BookmarkState.Empty;
		this.url = String(props.url || '');

		makeObservable(this, {
			targetObjectId: observable,
			state: observable,
			url: observable,
		});

		intercept(this as any, (change: any) => { return Util.intercept(this, change); });
	};

};

export default BlockContentBookmark;