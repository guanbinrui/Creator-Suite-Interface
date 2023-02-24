import { formatDistanceToNowStrict } from 'date-fns'
import { Link } from 'react-router-dom'
import { formatBalance } from '../../helpers/formatBalance'

export function Creation(props) {
    return (
        <Link to={`/creation/${props.id}`}>
            <div key={props.id} className="group relative">
                <div className="min-h-40 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-40">
                    <img
                        src={props.imageSrc}
                        alt={props.imageAlt}
                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    />
                </div>
                <div className="mt-4 flex justify-between">
                    <div>
                        <h3 className="text-sm text-gray-700 font-bold">
                            <span aria-hidden="true" className="absolute inset-0" />
                            {props.name}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                            {formatDistanceToNowStrict(props.updatedAt, {
                                addSuffix: true,
                            })}
                        </p>
                    </div>
                    <p className="text-sm text-gray-900">
                        <span className="mr-1 text-gray-500">Price:</span>
                        <span className="font-medium">{formatBalance(props.paymentTokenAmount, 0, 2)} DAI</span>
                    </p>
                </div>
            </div>
        </Link>
    )
}
