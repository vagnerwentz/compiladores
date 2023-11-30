using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;

namespace Compiler.CodeAnalysis
{
    public static class DiagnosticExtensions
    {
        public static bool HasErrors(this ImmutableArray<Diagnostic> diagnostics)
        {
            return diagnostics.Any(d => d.IsError);
        }

        public static bool HasErrors(this IEnumerable<Diagnostic> diagnostics)
        {
            return diagnostics.Any(d => d.IsError);
        }
    }
}