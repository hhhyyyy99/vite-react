import { ContentUtils } from "braft-utils";

// 声明blockRendererFn
export const blockRendererFn = (block, { editor, editorState }) => {
    const key = block.getEntityAt(0);
    if (block.getType() === "atomic" && key !== null) {
        const entity = editorState
            .getCurrentContent()
            .getEntity(key);

        const blockData = editorState
            .getCurrentContent()
            .getEntity(key)
            .getData();

        if (entity.getType() === "block-video") {
            return {
                component: BlockVideoComponent,
                editable: false, // 此处的editable并不代表组件内容实际可编辑，强烈建议设置为false
                props: { editor, editorState, customData: blockData }, // 此处传入的内容可以在组件中通过this.props.blockProps获取到
            };
        }

        if (entity.getType() === "block-file") {
            return {
                component: BlockFileComponent,
                editable: false,
                props: { editor, editorState, customData: blockData },
            };
        }

        if (entity.getType() === "block-image") {
            return {
                component: BlockImageComponent,
                editable: false,
                props: { editor, editorState, customData: blockData },
            };
        }

    }
};


export const BlockFileComponent = (props: { blockProps: any; block: any }) => {
    const { block, blockProps } = props;

    // 注意：通过blockRendererFn定义的block，无法在编辑器中直接删除，需要在组件中增加删除按钮
    const removeBarBlock = () => {
        blockProps.editor.setValue(
            ContentUtils.removeBlock(blockProps.editorState, block)
        );
    };

    const fileName = getFileTypeName(blockProps.customData.name);

    return (
        <div className="block-file--file">
            <div className="block-file--file___ext">{fileName}</div>
            <div className="block-file--file___content">
                <div className="block-file--file___content____name">
                    {blockProps.customData.name}
                </div>
                <div className="block-file--file___content____size">
                    {formatBytes(blockProps.customData.size)}
                </div>
            </div>
        </div>
    );
};

export const BlockVideoComponent = (props: { blockProps: any; block: any }) => {
    const { block, blockProps } = props;

    const fileName = getFileTypeName(blockProps.customData.name);

    return (
        <div className="block-file--file">
            <div className="block-file--file___ext">{fileName}</div>
            <div className="block-file--file___content">
                <div className="block-file--file___content____name">
                    {blockProps.customData.name}
                </div>
                <div className="block-file--file___content____size">
                    {formatBytes(blockProps.customData.size)}
                </div>
            </div>
        </div>
    );
};

export const BlockImageComponent = (props: { blockProps: any; block: any }) => {
    const { block, blockProps } = props;
    const { base64URL } = blockProps.customData;
    return (
        <div className="block-image">
            <img src={base64URL} alt="" />
        </div>
    );
};

export const getFileTypeName = (fileName: string) => {
    const match = fileName.match(/\.(\w+)$/);
    return match ? match[1] : 'unknow';
};

// 处理字节数
const KILOBYTE = 1024; // 字节算
function formatBytes(bytes) {
    if (!bytes) {
        return "0 B";
    }
    if (bytes < KILOBYTE) {
        return `${bytes.toFixed(2)} B`;
    } else if (bytes < KILOBYTE * KILOBYTE) {
        return `${(bytes / KILOBYTE).toFixed(2)} KB`;
    } else {
        return `${(bytes / (KILOBYTE * KILOBYTE)).toFixed(2)} MB`;
    }
}