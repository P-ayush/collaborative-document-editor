interface Props {
    document: {
        title: string;
        currentVersion: number;
    };
}

export default function EditorHeader({
    document,
}: Props) {
    return (
        <div className="mb-8 flex items-center justify-between">
            <div>
                <h1 className="text-3xl font-bold">
                    {document.title}
                </h1>

                <p className="text-muted-foreground">
                    Version {document.currentVersion}
                </p>
            </div>
        </div>
    );
}