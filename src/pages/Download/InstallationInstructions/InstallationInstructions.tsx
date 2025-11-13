interface InstallationInstructionsProps {
    t: (key: string) => string;
}

const InstallationInstructions = ({ t }: InstallationInstructionsProps) => (
    <section className="bg-white dark:bg-[#2D2D2D] rounded-lg shadow-lg p-8 md:p-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-[#E5E5E5] mb-8">
            {t('download.instructions.title')}
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
            <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mb-4">
                    {t('download.instructions.dmg.title')}
                </h3>

                <ol className="space-y-3 text-gray-600 dark:text-[#B0B0B0]">
                    <li className="flex">
                        <span className="font-bold mr-2">
                            1.
                        </span>

                        {t('download.instructions.dmg.step1')}
                    </li>

                    <li className="flex">
                        <span className="font-bold mr-2">
                            2.
                        </span>

                        {t('download.instructions.dmg.step2')}
                    </li>

                    <li className="flex">
                        <span className="font-bold mr-2">
                            3.
                        </span>

                        {t('download.instructions.dmg.step3')}
                    </li>

                    <li className="flex">
                        <span className="font-bold mr-2">
                            4.
                        </span>

                        {t('download.instructions.dmg.step4')}
                    </li>

                    <li className="flex">
                        <span className="font-bold mr-2">
                            5.
                        </span>

                        {t('download.instructions.dmg.step5')}
                    </li>
                </ol>
            </div>

            <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mb-4">
                    {t('download.instructions.zip.title')}
                </h3>

                <ol className="space-y-3 text-gray-600 dark:text-[#B0B0B0]">
                    <li className="flex">
                        <span className="font-bold mr-2">
                            1.
                        </span>

                        {t('download.instructions.zip.step1')}
                    </li>

                    <li className="flex">
                        <span className="font-bold mr-2">
                            2.
                        </span>

                        {t('download.instructions.zip.step2')}
                    </li>

                    <li className="flex">
                        <span className="font-bold mr-2">
                            3.
                        </span>

                        {t('download.instructions.zip.step3')}
                    </li>

                    <li className="flex">
                        <span className="font-bold mr-2">
                            4.
                        </span>

                        {t('download.instructions.zip.step4')}
                    </li>
                </ol>
            </div>
        </div>
    </section>
);

export default InstallationInstructions;
