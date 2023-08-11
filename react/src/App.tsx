import axios from 'axios';
import classes from './App.module.scss';

import { ChangeEventHandler, FC, MouseEventHandler, useState } from 'react';
import RequestBody from './models/requests/requestBody.model';
import SummarizeResponse from './models/responses/summarizeResponse.model';
import FeatureOption from './models/featureOption.enum';

const App: FC = () => {
    const [inputValue, setInputValue] = useState<string>('');
    const [response, setResponse] = useState<string | null>(null);
    const [feature, setFeature] = useState<FeatureOption>(
        FeatureOption.SUMMARIZE
    );

    const inputOnChangeHandler: ChangeEventHandler<HTMLTextAreaElement> = (
        event
    ) => {
        setInputValue(event.target.value);
    };

    const submitButtonOnClickHandler: MouseEventHandler<
        HTMLButtonElement
    > = () => {
        const SERVICE_URL = 'http://localhost:3001';
        const url = `${SERVICE_URL}/api/${feature}/`;
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
            .catch((error) => {
                alert(error);
                console.log(error);
            });
    };

    const clearButtonOnClickHandler: MouseEventHandler<
        HTMLButtonElement
    > = () => {
        setInputValue('');
    };

    const featureSelectorOnChangeHandler: ChangeEventHandler<
        HTMLSelectElement
    > = (event) => {
        setFeature(event.target.value as FeatureOption);
    };

    return (
        <>
            <div className={classes.flexContainer}>
                <div>
                    <div className={classes.buttonContainer}>
                        <select
                            value={feature}
                            onChange={featureSelectorOnChangeHandler}
                        >
                            <option value={FeatureOption.SUMMARIZE}>
                                Summarize
                            </option>
                            <option value={FeatureOption.TRANSLATE}>
                                Translate
                            </option>
                        </select>
                        <button
                            onClick={submitButtonOnClickHandler}
                            className={classes.button}
                        >
                            Submit
                        </button>
                        <button
                            onClick={clearButtonOnClickHandler}
                            className={classes.button}
                        >
                            Clear
                        </button>
                    </div>
                    <div>
                        <textarea
                            placeholder='Please input something you want to summary or translate'
                            onChange={inputOnChangeHandler}
                            value={inputValue}
                            cols={30}
                            rows={40}
                            className={`${classes.textarea} ${classes.box}`}
                        />
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
