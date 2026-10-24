using Microsoft.Extensions.Localization;
using System.Text.RegularExpressions;

namespace Remotely.Server.Extensions;

public static partial class LocalizerExtensions
{
    [GeneratedRegex(@"\s+")]
    private static partial Regex Whitespace();

    /// <summary>
    /// Translates a message that was built elsewhere (toasts, modal text, status messages).
    /// Whitespace is collapsed to single spaces first, so multi-line source strings can be
    /// matched by a single-line resource key. Unknown text is returned unchanged.
    /// </summary>
    public static string Translate(this IStringLocalizer localizer, string? text)
    {
        if (string.IsNullOrWhiteSpace(text))
        {
            return text ?? string.Empty;
        }

        var key = Whitespace().Replace(text, " ").Trim();
        var result = localizer[key];
        return result.ResourceNotFound ? text : result.Value;
    }
}
