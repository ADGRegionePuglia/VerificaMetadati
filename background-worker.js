function loadScript() {
  import("./gs-worker.js");
}

var Module;

const icc = "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"
const PDFA_def ="JSEKJSBUaGlzIGlzIGEgc2FtcGxlIHByZWZpeCBmaWxlIGZvciBjcmVhdGluZyBhIFBERi9BIGRvY3VtZW50LgolIFVzZXJzIHNob3VsZCBtb2RpZnkgZW50cmllcyBtYXJrZWQgd2l0aCAiQ3VzdG9taXplIi4KJSBUaGlzIGFzc3VtZXMgYW4gSUNDIHByb2ZpbGUgcmVzaWRlcyBpbiB0aGUgZmlsZSAoc3JnYi5pY2MpLAolIGluIHRoZSBjdXJyZW50IGRpcmVjdG9yeSB1bmxlc3MgdGhlIHVzZXIgbW9kaWZpZXMgdGhlIGNvcnJlc3BvbmRpbmcgbGluZSBiZWxvdy4KCiUgRGVmaW5lIGVudHJpZXMgaW4gdGhlIGRvY3VtZW50IEluZm8gZGljdGlvbmFyeSA6ClsgL0NyZWF0b3IgKFJlZ2lvbmUgUHVnbGlhKQogIC9ET0NJTkZPIHBkZm1hcmsKCiUgRGVmaW5lIGFuIElDQyBwcm9maWxlIDoKL0lDQ1Byb2ZpbGUgKHNSR0IyMDE0LmljYykKZGVmCgpbL19vYmpkZWYge2ljY19QREZBfSAvdHlwZSAvc3RyZWFtIC9PQkogcGRmbWFyawoKJSUgVGhpcyBjb2RlIGF0dGVtcHRzIHRvIHNldCB0aGUgL04gKG51bWJlciBvZiBjb21wb25lbnRzKSBrZXkgZm9yIHRoZSBJQ0MgY29sb3VyIHNwYWNlLgolJSBUbyBkbyB0aGlzIGl0IGNoZWNrcyB0aGUgQ29sb3JDb252ZXJzaW9uU3RyYXRlZ3kgb3IgdGhlIGRldmljZSBQcm9jZXNzQ29sb3JNb2RlbCBpZgolJSBDb2xvckNvbnZlcnNpb25TdHJhdGVneSBpcyBub3Qgc2V0LgolJSBUaGlzIGlzIG5vdCAxMDAlIHJlbGlhYmxlLiBBIGJldHRlciBzb2x1dGlvbiBpcyBmb3IgdGhlIHVzZXIgdG8gZWRpdCB0aGlzIGFuZCByZXBsYWNlCiUlIHRoZSBjb2RlIGJldHdlZW4gdGhlIC0tLTg8LS0tIGxpbmVzIHdpdGggYSBzaW1wbGUgZGVjbGFyYXRpb24gbGlrZToKJSUgICAvTiAzCiUlIHdoZXJlIHRoZSB2YWx1ZSBvZiBOIGlzIHRoZSBudW1iZXIgb2YgY29tcG9uZW50cyBmcm9tIHRoZSBwcm9maWxlIGRlZmluZWQgaW4gL0lDQ1Byb2ZpbGUgYWJvdmUuCiUlClt7aWNjX1BERkF9Cjw8CiUlIC0tLS0tLS0tLS04PC0tLS0tLS0tLS0tLS0tODwtLS0tLS0tLS0tLS0tODwtLS0tLS0tLS0tLS0tLTg8LS0tLS0tLS0tLQogIHN5c3RlbWRpY3QgL0NvbG9yQ29udmVyc2lvblN0cmF0ZWd5IGtub3duIHsKICAgIHN5c3RlbWRpY3QgL0NvbG9yQ29udmVyc2lvblN0cmF0ZWd5IGdldCBjdm4gZHVwIC9HcmF5IGVxIHsKICAgICAgcG9wIC9OIDEgZmFsc2UKICAgIH17CiAgICAgIGR1cCAvUkdCIGVxIHsKICAgICAgICBwb3AgL04gMyBmYWxzZQogICAgICB9ewogICAgICAgIC9DTVlLIGVxIHsKICAgICAgICAgIC9OIDQgZmFsc2UKICAgICAgICB9ewogICAgICAgICAgKFx0Q29sb3JDb252ZXJzaW9uU3RyYXRlZ3kgbm90IGEgZGV2aWNlIHNwYWNlLCBmYWxsaW5nIGJhY2sgdG8gUHJvY2Vzc0NvbG9yTW9kZWwsIG91dHB1dCBtYXkgbm90IGJlIHZhbGlkIFBERi9BLlxuKT0KICAgICAgICAgIHRydWUKICAgICAgICB9IGlmZWxzZQogICAgICB9IGlmZWxzZQogICAgfSBpZmVsc2UKICB9IHsKICAgIChcdENvbG9yQ29udmVyc2lvblN0cmF0ZWd5IG5vdCBzZXQsIGZhbGxpbmcgYmFjayB0byBQcm9jZXNzQ29sb3JNb2RlbCwgb3V0cHV0IG1heSBub3QgYmUgdmFsaWQgUERGL0EuXG4pPQogICAgdHJ1ZQogIH0gaWZlbHNlCgogIHsKICAgIGN1cnJlbnRwYWdlZGV2aWNlIC9Qcm9jZXNzQ29sb3JNb2RlbCBnZXQKICAgIGR1cCAvRGV2aWNlR3JheSBlcSB7CiAgICAgIHBvcCAvTiAxCiAgICB9ewogICAgICBkdXAgL0RldmljZVJHQiBlcSB7CiAgICAgICAgcG9wIC9OIDMKICAgICAgfXsKICAgICAgICBkdXAgL0RldmljZUNNWUsgZXEgewogICAgICAgICAgcG9wIC9OIDQKICAgICAgICB9IHsKICAgICAgICAgIChcdFByb2Nlc3NDb2xvck1vZGVsIG5vdCBhIGRldmljZSBzcGFjZS4pPQogICAgICAgICAgL1Byb2Nlc3NDb2xvck1vZGVsIGN2eCAvcmFuZ2VjaGVjayBzaWduYWxlcnJvcgogICAgICAgIH0gaWZlbHNlCiAgICAgIH0gaWZlbHNlCiAgICB9IGlmZWxzZQogIH0gaWYKJSUgLS0tLS0tLS0tLTg8LS0tLS0tLS0tLS0tLS04PC0tLS0tLS0tLS0tLS04PC0tLS0tLS0tLS0tLS0tODwtLS0tLS0tLS0tCgo+PiAvUFVUIHBkZm1hcmsKWwp7aWNjX1BERkF9CntJQ0NQcm9maWxlIChyKSBmaWxlfSBzdG9wcGVkCnsKICAoXG5cdEZhaWxlZCB0byBvcGVuIHRoZSBzdXBwbGllZCBJQ0NQcm9maWxlIGZvciByZWFkaW5nLiBUaGlzIG1heSBiZSBkdWUgdG9cbikgcHJpbnQKICAoXHQgIGFuIGluY29ycmVjdCBmaWxlbmFtZSBvciBhIGZhaWx1cmUgdG8gYWRkIC0tcGVybWl0LWZpbGUtcmVhZD08cHJvZmlsZT5cbikgcHJpbnQKICAoXHQgIHRvIHRoZSBjb21tYW5kIGxpbmUuIFRoaXMgUG9zdFNjcmlwdCBwcm9ncmFtIG5lZWRzIHRvIG9wZW4gdGhlIGZpbGVcbikgcHJpbnQKICAoXHQgIGFuZCB5b3UgbXVzdCBleHBsaWNpdGx5IGdyYW50IGl0IHBlcm1pc3Npb24gdG8gZG8gc28uXG5cbikgcHJpbnQKICAoXHRQREYvQSBwcm9jZXNzaW5nIGFib3J0ZWQsIG91dHB1dCBtYXkgbm90IGJlIGEgUERGL0EgZmlsZS5cblxuKSBwcmludAogIGNsZWFydG9tYXJrCn0KewogIC9QVVQgcGRmbWFyawogICUgRGVmaW5lIHRoZSBvdXRwdXQgaW50ZW50IGRpY3Rpb25hcnkgOgoKICBbL19vYmpkZWYge091dHB1dEludGVudF9QREZBfSAvdHlwZSAvZGljdCAvT0JKIHBkZm1hcmsKICBbe091dHB1dEludGVudF9QREZBfSA8PAogICAgL1R5cGUgL091dHB1dEludGVudCAgICAgICAgICAgICAgICUgTXVzdCBiZSBzbyAodGhlIHN0YW5kYXJkIHJlcXVpcmVzKS4KICAgIC9TIC9HVFNfUERGQTEgICAgICAgICAgICAgICAgICAgICAlIE11c3QgYmUgc28gKHRoZSBzdGFuZGFyZCByZXF1aXJlcykuCiAgICAvRGVzdE91dHB1dFByb2ZpbGUge2ljY19QREZBfSAgICAgJSBNdXN0IGJlIHNvIChzZWUgYWJvdmUpLgogICAgL091dHB1dENvbmRpdGlvbklkZW50aWZpZXIgKHNSR0IpCiAgICAvT3V0cHV0Q29uZGl0aW9uIChJRUMgNjE5NjYtMi0xOjE5OTkpCiAgICAvUmVnaXN0cnlOYW1lIChodHRwOi8vd3d3LmNvbG9yLm9yZykKICAgIC9JbmZvIChzUkdCMjAxNCBcKHYyXCkpCgogID4+IC9QVVQgcGRmbWFyawogIFt7Q2F0YWxvZ30gPDwvT3V0cHV0SW50ZW50cyBbIHtPdXRwdXRJbnRlbnRfUERGQX0gXT4+IC9QVVQgcGRmbWFyawp9IGlmZWxzZQo="

function _GSPS2PDF(
  dataStruct,
  responseCallback,
) {
  // first download the ps data
  var xhr = new XMLHttpRequest();
  xhr.open("GET", dataStruct.psDataURL);
  xhr.responseType = "arraybuffer";
  xhr.onload = function () {
    console.log('onload')
    // release the URL
    console.log("test")
    self.URL.revokeObjectURL(dataStruct.psDataURL);
    //set up EMScripten environment
    Module = {
      preRun: [
        function () {
          self.Module.FS.writeFile("input.pdf", new Uint8Array(xhr.response));
          const binaryString = atob(icc)
          var bytes = new Uint8Array(binaryString.length)
          for (var i = 0; i < binaryString.length; i++) {
              bytes[i] = binaryString.charCodeAt(i)
          }
          self.Module.FS.writeFile("sRGB2014.icc", bytes);
          const binaryString_2 = atob(PDFA_def)
          var bytes_2 = new Uint8Array(binaryString_2.length)
          for (var i = 0; i < binaryString_2.length; i++) {
              bytes_2[i] = binaryString_2.charCodeAt(i)
          }
          self.Module.FS.writeFile("PDFA_def.ps", bytes_2);
          const binaryString_3 = atob(dataStruct.pdfmark)
          var bytes_3 = new Uint8Array(binaryString_3.length)
          for (var i = 0; i < binaryString_3.length; i++) {
              bytes_3[i] = binaryString_3.charCodeAt(i)
          }
          self.Module.FS.writeFile("docinfo.pdfmark", bytes_3);
        },
      ],
      postRun: [
        function () {
          var uarray = self.Module.FS.readFile("output.pdf", { encoding: "binary" });
          var blob = new Blob([uarray], { type: "application/octet-stream" });
          var pdfDataURL = self.URL.createObjectURL(blob);
          responseCallback({ pdfDataURL: pdfDataURL, url: dataStruct.url });
        },
      ],
      arguments: [
        "-sDEVICE=pdfwrite",
        "-dPDFA=3",
        "-dCompatibilityLevel=1.7",
        "-dPDFACompatibilityPolicy=1",
        "-sOutputICCProfile=sRGB2014.icc",
        "-sProcessColorModel=DeviceRGB",
        "-DNOPAUSE",
        "-dQUIET",
        "-dBATCH",
        "-sOutputFile=output.pdf",
        "input.pdf",
        "PDFA_def.ps",
        "docinfo.pdfmark",
      ],
      print: function (text) {},
      printErr: function (text) {},
      totalDependencies: 0,
      noExitRuntime: 1
    };
    // Module.setStatus("Loading Ghostscript...");
    if (!self.Module) {
      self.Module = Module;
      loadScript();
    } else {
      self.Module["calledRun"] = false;
      self.Module["postRun"] = Module.postRun;
      self.Module["preRun"] = Module.preRun;
      self.Module.callMain();
    }
  };
  xhr.send();
}


self.addEventListener('message', function({data:e}) {
  console.log("message", e)
  // e.data contains the message sent to the worker.
  if (e.target !== 'wasm'){
    return;
  }
  console.log('Message received from main script', e.data);
  _GSPS2PDF(e.data, ({pdfDataURL}) => self.postMessage(pdfDataURL))
});

console.log("Worker ready")
