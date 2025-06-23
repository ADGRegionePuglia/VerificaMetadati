import io
from pdftools_sdk.pdf import document, conformance
from pdftools_sdk.pdf_a.conversion import converter, event_code, event_category, event_severity
from pdftools_sdk.pdf_a.validation import validator, analysis_options
from pdftools_sdk.pdf_a.validation.validation_options import ValidationOptions

events_severity = event_severity.EventSeverity.INFORMATION

def event_handler(data_part: str, message: str, severity: event_severity.EventSeverity, category: event_category.EventCategory, code: event_code.EventCode, context_info: str, page_no: int):
    suggested_severity = severity

    global events_severity

    if suggested_severity > events_severity:
        events_severity = suggested_severity

    if suggested_severity == event_severity.EventSeverity.INFORMATION:
        severity_char = 'I'
    elif suggested_severity == event_severity.EventSeverity.WARNING:
        severity_char = 'W'
    else:
        severity_char = 'E'

    if page_no > 0:
        print(f"- {severity_char} {category.name}: {message} ({context_info} on page {page_no})")
    else:
        print(f"- {severity_char} {category.name}: {message} ({context_info})")


from typing import Any

def my_error_handler(
    error_code: Any,
    message: str,
    category: Any,
    context: str,
    page_number: int,
    object_number: int
):
    print(f"Validation Error: Code={error_code}, Msg='{message}', Category={category}, "
           f"Context='{context}', Page={page_number}, Object={object_number}")



with io.FileIO("../input_pdf.pdf", 'rb') as in_stream:
    with document.Document.open(in_stream) as input_document:
        validator.add_error_handler(my_error_handler)
        validation_options = ValidationOptions()
        validation_options.conformance = conformance.Conformance.PDF_A3_B
        validation_result = validator.validate(input_document, validation_options)

"""
        validator = validator.Validator()
        analysis_options = analysis_options.AnalysisOptions()
        analysis_options.conformance = conformance.Conformance.PDF_A3_B

        analysis_result = validator.analyze(input_document, analysis_options)

        if analysis_result.is_conforming:
            print(f"Document conforms to {input_document.conformance.name} already.")

        #converter = converter.Converter()
        #converter.add_conversion_event_handler(event_handler)
        

        with io.FileIO("convert_2.pdf", 'wb+') as output_stream:
            output_document = converter.convert(analysis_result, input_document, output_stream, None)

            match events_severity:
                case event_severity.EventSeverity.INFORMATION:
                    print(f"Successfully converted document to {output_document.conformance.name}.")

                case event_severity.EventSeverity.WARNING:
                    print(f"Warnings occurred during the conversion of document to {output_document.conformance.name}.")
                    print("Check the output file to decide if the result is acceptable.")

                case event_severity.EventSeverity.ERROR:
                    raise Exception(
                        f"Unable to convert document to {conformance.Conformance.name} because of critical conversion events.")
"""