import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog.tsx";
import { Kbd } from "@/components/ui/kbd.tsx";

const AccessTokenHelpModal = (props: { isOpen: boolean; setOpen: (newOpen: boolean) => void }) => {
  const exampleJson = `{"success":1,"data":{"webapi_token":"eyAidHlwIjogIkpXVCIsICJhbGciOiAiRWREU0EiIH0.eyAiaXNzIjogInI6MDAxNF8yNkUxMTAz..."}}`;

  return (
    <Dialog open={props.isOpen} onOpenChange={props.setOpen}>
      <DialogContent className="!w-[800px] !max-w-[90vw] !max-h-[95vh] !overflow-y-auto">
        <DialogHeader>
          <DialogTitle>How to Get Your Steam Access Token</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 text-gray-300">
          <div>
            <p className="text-sm leading-relaxed">
              To access family shared games, you need to provide a Steam Web API token. Follow these steps:
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <div>
              <p className="font-semibold text-gray-200 mb-2">1. Make sure you're signed in to Steam</p>
              <p className="text-sm text-gray-400">
                Open your browser and ensure you're logged in to your Steam account at{" "}
                <a
                  href="https://store.steampowered.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-link hover:underline"
                >
                  store.steampowered.com
                </a>
              </p>
            </div>

            <div>
              <p className="font-semibold text-gray-200 mb-2">2. Visit the token URL</p>
              <p className="text-sm text-gray-400 mb-2">
                Go to this URL in your browser:
              </p>
              <a
                href="https://store.steampowered.com/pointssummary/ajaxgetasyncconfig"
                target="_blank"
                rel="noopener noreferrer"
                className="text-link hover:underline text-sm break-all inline-block bg-gray-800 p-2 rounded"
              >
                https://store.steampowered.com/pointssummary/ajaxgetasyncconfig
              </a>
            </div>

            <div>
              <p className="font-semibold text-gray-200 mb-2">3. Copy the response</p>
              <p className="text-sm text-gray-400 mb-2">
                You'll see a JSON response that looks like this:
              </p>
              <div className="bg-gray-800 p-3 rounded text-xs font-mono overflow-x-auto">
                <pre className="text-gray-300 whitespace-pre-wrap break-words">{exampleJson}</pre>
              </div>
            </div>

            <div>
              <p className="font-semibold text-gray-200 mb-2">4. Paste it here</p>
              <p className="text-sm text-gray-400">
                Copy the <span className="font-semibold">entire JSON response</span> or just the{" "}
                <Kbd>webapi_token</Kbd> value and paste it into the input field. Both formats are accepted.
              </p>
            </div>
          </div>

          <div className="bg-yellow-900/20 border border-yellow-700/30 p-3 rounded mt-2">
            <p className="text-yellow-200 text-sm font-semibold mb-2">⚠️ Important</p>
            <p className="text-yellow-100/90 text-sm">
              This token gives access to your Steam account. Never share it with anyone you don't trust.
              This application only uses it to access your family shared games list.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AccessTokenHelpModal;