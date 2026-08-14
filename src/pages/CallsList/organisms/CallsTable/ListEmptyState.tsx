import { FileText } from 'lucide-react';

type ListEmptyStateProps = {
    title?: string;
    description?: string;
};

function ListEmptyState({
    title = 'No calls found',
    description = 'There are no calls matching your current filters.',
}: ListEmptyStateProps) {
    return (
        <div className="flex h-full min-h-[400px] flex-col items-center justify-center px-4 text-center">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                <FileText
                    size={24}
                    strokeWidth={1.5}
                    className="text-gray-400"
                />
            </div>

            <h3 className="text-sm font-semibold text-gray-900">
                {title}
            </h3>

            <p className="mt-1 max-w-sm text-sm text-gray-500">
                {description}
            </p>
        </div>
    );
}

export default ListEmptyState;