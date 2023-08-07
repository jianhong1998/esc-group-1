import axios from 'axios';
import classes from './App.module.scss';

import { ChangeEventHandler, FC, MouseEventHandler, useState } from 'react';
import RequestBody from './models/requests/requestBody.model';
import SummarizeResponse from './models/responses/summarizeResponse.model';

const App: FC = () => {
    const [inputValue, setInputValue] = useState<string>('');
    const [response, setResponse] = useState<string | null>(null);

    const inputOnChangeHandler: ChangeEventHandler<HTMLTextAreaElement> = (
        event
    ) => {
        setInputValue(event.target.value);
    };

    const submitButtonOnClickHandler: MouseEventHandler<
        HTMLButtonElement
    > = () => {
        const SERVICE_URL = 'http://localhost:3001';
        const url = `${SERVICE_URL}/api/summarize/`;
        const reqBody: RequestBody = {
            message: inputValue,
        };

        setResponse(null);

        axios
            .post<SummarizeResponse>(url, reqBody)
            .then(({ data }) => {
                const { message, response, success } = data;

                if (!success) {
                    throw new Error(`Not Success: ${message}`);
                }

                if (typeof response === 'undefined') {
                    throw new Error(
                        `No response is given. Error message: ${message}`
                    );
                }

                setResponse(response.message.content);
            })
            .then(() => {
                setInputValue('');
            })
            .catch((error) => {
                alert(error);
            });
    };

    return (
        <>
            <div className={classes.flexContainer}>
                <div>
                    <div>
                        <textarea
                            onChange={inputOnChangeHandler}
                            value={inputValue}
                            cols={30}
                            rows={40}
                        />
                    </div>
                    <div>
                        <button
                            onClick={submitButtonOnClickHandler}
                            className={classes.button}
                        >
                            Submit
                        </button>
                    </div>
                </div>
                <div
                    className={`${classes.box} ${
                        response ? '' : classes.emptyBox
                    }`}
                >
                    {response || ''}
                </div>
            </div>
        </>
    );
};

export default App;
