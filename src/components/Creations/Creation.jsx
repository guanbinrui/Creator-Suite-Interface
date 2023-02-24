import { formatDistanceToNowStrict } from 'date-fns'
import { Link } from 'react-router-dom'
import { formatPrice } from '../../helpers/formatPrice'
import { getFileType } from '../../helpers/getFileType'

export function Creation(props) {
    return (
        <Link to={`/creation/${props.id}`}>
            <div key={props.id} className="group relative">
                <div className="min-h-40 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-40">
                    <span className="h-full w-full text-6xl object-cover object-center lg:h-full lg:w-full inline-flex items-center justify-center">
                        {getFileType(props.attachments[0]).toUpperCase()}
                    </span>
                </div>
                <div className="mt-4">
                    <h3 className="text-sm text-gray-700 font-bold">
                        <span aria-hidden="true" className="absolute inset-0" />
                        {props.name}
                    </h3>

                    <div className="flex justify-between ">
                        <p className="mt-1 text-sm text-gray-500">
                            {formatDistanceToNowStrict(props.updatedAt, {
                                addSuffix: true,
                            })}
                        </p>
                        <p className="text-sm text-gray-900">
                            <span className="mr-1 text-gray-500">Price:</span>
                            <span className="font-medium">
                                {formatPrice(props.paymentTokenAmount * 10, 'DAI')}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    )
}
